// Copyright (c) Project Jupyter.
// Distributed under the terms of the Modified BSD License.

// TODO: import from @jupyter-widgets/jupyterlab-manager once Output is
// exported by the main module.
import {
   OutputModel
} from '@jupyter-widgets/jupyterlab-manager/lib/output';

import {
  EXTENSION_SPEC_VERSION
} from './version';

export
class SidecarModel extends OutputModel {
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
    this.widget_manager.display_model(undefined, this, {});
  }

  static serializers : any = {
      ...OutputModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'SidecarModel';
  static model_module = '@jupyter-widgets/jupyterlab-sidecar';
  static model_module_version = EXTENSION_SPEC_VERSION;
  static view_name = 'SidecarView';  // Set to null if no view
  static view_module = '@jupyter-widgets/jupyterlab-sidecar';   // Set to null if no view
  static view_module_version = EXTENSION_SPEC_VERSION;
}
