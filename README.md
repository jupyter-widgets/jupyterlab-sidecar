# Sidecar

[![Build Status](https://travis-ci.org/jupyter-widgets/jupyterlab-sidecar.svg?branch=master)](https://travis-ci.org/jupyter-widgets/jupyterlab-sidecar)
[![codecov](https://codecov.io/gh/jupyter-widgets/jupyterlab-sidecar/branch/master/graph/badge.svg)](https://codecov.io/gh/jupyter-widgets/jupyterlab-sidecar)

A sidecar output widget for JupyterLab

## Installation

If you use jupyterlab:

```bash
pip install sidecar
jupyter labextension install @jupyter-widgets/jupyterlab-manager
jupyter labextension install @jupyter-widgets/jupyterlab-sidecar
```

## Usage

The sidecar widget is used as a context manager, just like ipywidgets' output
widget.

```python
from sidecar import Sidecar
from ipywidgets import IntSlider

sc = Sidecar(title='Sidecar Output')
sl = IntSlider(description='Some slider')
with sc:
    display(sl)
```

When a single output is displayed in a Sidecar, it is allowed to occupy all of
the vertical space available. If more content is displayed, the natural height
is used instead.

![sidecar](sidecar.gif)

## Development

```bash
# Create a new conda environment
conda create -n jupyterlab-sidecar -c conda-forge jupyterlab ipywidgets nodejs

# Activate the conda environment
conda activate jupyterlab-sidecar

# Install dependencies
npm install

# Build Typescript source
npm run build

# Link your development version of the extension with JupyterLab
jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build
jupyter labextension install .

# Install the sidecar Python package
python -m pip install -e .
```

### To see your changes
Run jupyterlab in watch mode:

```bash
jupyter lab --watch
```

```
# Rebuild Typescript source after making changes
npm build
```

then refresh the browser page and your changes will be active.
