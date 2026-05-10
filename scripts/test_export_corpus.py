import pytest
from pathlib import Path
from scripts.export_corpus import parse_heading_id_count

def test_parse_heading_id_count_basic(tmp_path):
    d = tmp_path / "subdir"
    d.mkdir()
    f = d / "test.md"
    f.write_text("""
### T-001
Some text.
| T-002 | Table |
### T-003
""", encoding="utf-8")

    assert parse_heading_id_count(f, "T") == 3

def test_parse_heading_id_count_deduplication(tmp_path):
    f = tmp_path / "test.md"
    f.write_text("""
### T-001
| T-001 | Duplicate |
### T-002
| T-002 | Duplicate |
""", encoding="utf-8")

    assert parse_heading_id_count(f, "T") == 2

def test_parse_heading_id_count_prefix_filtering(tmp_path):
    f = tmp_path / "test.md"
    f.write_text("""
### T-001
### P-001
| T-002 |
| P-002 |
""", encoding="utf-8")

    assert parse_heading_id_count(f, "T") == 2
    assert parse_heading_id_count(f, "P") == 2

def test_parse_heading_id_count_empty(tmp_path):
    f = tmp_path / "empty.md"
    f.write_text("", encoding="utf-8")
    assert parse_heading_id_count(f, "T") == 0

def test_parse_heading_id_count_malformed(tmp_path):
    f = tmp_path / "malformed.md"
    f.write_text("""
### T-1
### T-01
### T-0001
### T-abc
| T-1 |
| T-01 |
| T-0001 |
| T-abc |
""", encoding="utf-8")
    assert parse_heading_id_count(f, "T") == 0

def test_parse_heading_id_count_heading_levels(tmp_path):
    f = tmp_path / "levels.md"
    f.write_text("""
# T-001
## T-002
### T-003
#### T-004
##### T-005
###### T-006
""", encoding="utf-8")
    # Only ### T-003 should be counted
    assert parse_heading_id_count(f, "T") == 1

def test_parse_heading_id_count_table_positions(tmp_path):
    f = tmp_path / "table.md"
    f.write_text("""
| T-001 | First column |
| Description | T-002 |
| T-003 |
""", encoding="utf-8")
    # Current regex for tables is ^\|\s*({prefix}-\d{{3}})\s*\|
    # This means it ONLY matches if the ID is in the FIRST column.
    # Let's verify this behavior.
    assert parse_heading_id_count(f, "T") == 2 # T-001 and T-003
