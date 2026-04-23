use std::path::{Path, PathBuf};
use std::process::Command;
use tauri::Manager;

fn repo_root() -> Result<PathBuf, String> {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("..")
        .join("..")
        .canonicalize()
        .map_err(|error| format!("Could not resolve repo root: {error}"))
}

fn resolve_repo_path(relative_path: &str) -> Result<PathBuf, String> {
    let root = repo_root()?;
    let candidate = root.join(relative_path);
    let resolved = candidate
        .canonicalize()
        .map_err(|error| format!("Could not resolve source path {relative_path}: {error}"))?;

    if !resolved.starts_with(&root) {
        return Err("Requested path escapes the repository root.".into());
    }

    Ok(resolved)
}

fn open_with_system(path: &Path) -> Result<(), String> {
    #[cfg(target_os = "macos")]
    let mut command = {
        let mut command = Command::new("open");
        command.arg(path);
        command
    };

    #[cfg(target_os = "linux")]
    let mut command = {
        let mut command = Command::new("xdg-open");
        command.arg(path);
        command
    };

    #[cfg(target_os = "windows")]
    let mut command = {
        let mut command = Command::new("cmd");
        command.args(["/C", "start", "", &path.to_string_lossy()]);
        command
    };

    command
        .spawn()
        .map(|_| ())
        .map_err(|error| format!("Could not launch source file: {error}"))
}

#[tauri::command]
fn open_source_path(relative_path: String) -> Result<(), String> {
    let source_path = resolve_repo_path(&relative_path)?;
    open_with_system(&source_path)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .invoke_handler(tauri::generate_handler![open_source_path])
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
