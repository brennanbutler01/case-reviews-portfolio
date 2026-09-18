"""Deploy only the static portfolio artifact to the dedicated personal project."""
import argparse
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

parser = argparse.ArgumentParser()
parser.add_argument("--check", action="store_true", help="Validate packaging without deploying")
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
project_path = root / ".vercel/project.json"
project = json.loads(project_path.read_text())
if project.get("projectName") != "case-reviews-demo" or project.get("orgId") != "team_cwjFWlUVzkCIYgVepQ6Glc71":
    raise SystemExit("Link the dedicated personal case-reviews-demo Vercel project first.")
if not (root / "dist/index.html").is_file():
    raise SystemExit("Run corepack yarn build:portfolio first.")
# A directory outside Git publishes the verified artifact without Git author metadata.
with tempfile.TemporaryDirectory(prefix="case-reviews-deploy-") as directory:
    target = Path(directory)
    output = target / ".vercel/output"
    output.mkdir(parents=True)
    shutil.copyfile(project_path, target / ".vercel/project.json")
    shutil.copytree(root / "dist", output / "static")
    (output / "config.json").write_text(json.dumps({
        "version": 3,
        "routes": [{"handle": "filesystem"}, {"src": "/(.*)", "dest": "/index.html"}],
    }))
    if args.check:
        print("Static deployment package validated; no upload performed.")
    else:
        subprocess.run([
            "npm", "exec", "--yes", "--package=vercel@59.15.0", "--",
            "vercel", "deploy", "--prebuilt", "--prod", "--yes",
            "--scope", "brennanbutler01s-projects",
        ], cwd=target, check=True)
