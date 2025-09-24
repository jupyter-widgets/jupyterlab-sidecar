#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Project Jupyter.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import Output, widget_serialization
from traitlets import Unicode, CaselessStrEnum, Any, Instance
from ._frontend import EXTENSION_SPEC_VERSION

module_name = "@jupyter-widgets/jupyterlab-sidecar"


class Sidecar(Output):
    _model_name = Unicode('SidecarModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_SPEC_VERSION).tag(sync=True)
    _view_name = Unicode('SidecarView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(EXTENSION_SPEC_VERSION).tag(sync=True)
    title = Unicode('Sidecar').tag(sync=True)
    anchor = CaselessStrEnum(
        ['split-right', 'split-left', 'split-top', 'split-bottom', 'tab-before', 'tab-after', 'right'],
        default_value='right',
        allow_none=True
    ).tag(sync=True)
    ref = Instance('sidecar.Sidecar', allow_none=True).tag(sync=True, **widget_serialization)
    _widget_id = Any().tag(sync=True)

    @property
    def widget_id(self):
        return self._widget_id
