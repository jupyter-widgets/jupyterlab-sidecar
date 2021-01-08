// Copyright (c) Project Jupyter.
// Distributed under the terms of the Modified BSD License.

import {
   output
} from '@jupyter-widgets/jupyterlab-manager';

import {
  EXTENSION_SPEC_VERSION
} from './version';


export
class SidecarModel extends output.OutputModel {
  rendered: boolean;

  defaults() {
    return {...super.defaults(),
      _model_name: SidecarModel.model_name,
      _model_module: SidecarModel.model_module,
      _model_module_version: SidecarModel.model_module_version,
      _view_name: SidecarModel.view_name,
      _view_module: SidecarModel.view_module,
      _view_module_version: SidecarModel.view_module_version,
      title: 'Sidecar'
    };
  }

  initialize(attributes: any, options: any) {
    super.initialize(attributes, options);

    this.widget_manager.display_model(undefined as any, this as any, {});
  }

  static model_name = 'SidecarModel';
  static view_name = 'SidecarView';
  static model_module = '@jupyter-widgets/jupyterlab-sidecar';
  static view_module = '@jupyter-widgets/jupyterlab-sidecar';
  static model_module_version = EXTENSION_SPEC_VERSION;
  static view_module_version = EXTENSION_SPEC_VERSION;
}
