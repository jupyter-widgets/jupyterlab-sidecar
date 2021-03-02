# Sidecar

[![Build Status](https://travis-ci.org/jupyter-widgets/jupyterlab-sidecar.svg?branch=master)](https://travis-ci.org/jupyter-widgets/jupyterlab-sidecar)
[![codecov](https://codecov.io/gh/jupyter-widgets/jupyterlab-sidecar/branch/master/graph/badge.svg)](https://codecov.io/gh/jupyter-widgets/jupyterlab-sidecar)

A sidecar output widget for JupyterLab

## Installation

```bash
pip install sidecar
```

or

```bash
conda install sidecar
```

If you use JupyterLab <=2:
```bash
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
conda create -n jupyterlab-sidecar -c conda-forge jupyterlab ipywidgets nodejs -y

# Activate the conda environment
conda activate jupyterlab-sidecar

# Install package in development mode
pip install -e .

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Rebuild extension Typescript source after making changes
jlpm run build
```
You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```


With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the jlpm run build command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

## Uninstall

```
pip uninstall jupyterlab-sidecar
```