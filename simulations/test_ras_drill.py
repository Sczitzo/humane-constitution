import numpy as np
import pytest

from simulations.ras_drill import (
    build_population, allocate_flat, allocate_rotation, allocate_ras1,
    run_drill,
)


@pytest.fixture
def pop():
    return build_population()


def test_all_allocators_conserve_capacity(pop):
    needs, _ = pop
    capacity = needs.sum() * 0.7
    for alloc in (allocate_flat(needs, capacity),
                  allocate_rotation(needs, capacity, seed=1),
                  allocate_ras1(needs, capacity)):
        assert alloc.sum() == pytest.approx(capacity, rel=1e-6)
        assert (alloc >= 0).all()


def test_ras1_fulfillment_is_uniform_and_nonzero(pop):
    """INV-001/INV-003: everyone gets the same fraction of their own
    minimum, and nobody is zeroed."""
    needs, _ = pop
    ras1 = allocate_ras1(needs, needs.sum() * 0.7)
    ratios = ras1 / needs
    assert ratios.min() == pytest.approx(0.7)
    assert ratios.max() == pytest.approx(0.7)


def test_flat_cut_underserves_high_need(pop):
    """The naive equal cut leaves high-need people below the average
    fulfillment while low-need people are made whole."""
    needs, groups = pop
    flat = allocate_flat(needs, needs.sum() * 0.7)
    ratios = flat / needs
    child = ratios[groups == "child"].mean()
    lactating = ratios[groups == "lactating"].mean()
    assert child > lactating  # children over-served relative to need


def test_rotation_zeroes_people(pop):
    """The no-rule baseline serves some fully and others not at all."""
    needs, _ = pop
    rot = allocate_rotation(needs, needs.sum() * 0.7, seed=1)
    assert (rot == 0).sum() > 0          # some get nothing (INV-001 breach)
    assert (rot == needs).sum() > 0      # while others are made whole


def test_drill_covers_all_capacity_ratios():
    out = run_drill(n_rotation_seeds=3)
    assert set(out["results"].keys()) == {
        "capacity_95pct", "capacity_85pct", "capacity_70pct", "capacity_50pct"
    }
