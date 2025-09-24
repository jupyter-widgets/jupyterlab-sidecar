// Copyright (c) Project Jupyter.
// Distributed under the terms of the Modified BSD License.

import { DOMWidgetModel } from '@jupyter-widgets/base';
import { output } from '@jupyter-widgets/jupyterlab-manager';

import { EXTENSION_SPEC_VERSION } from './version';

export class SidecarModel extends output.OutputModel {
  rendered: boolean;

  defaults() {
    return {
      ...super.defaults(),
      _model_name: SidecarModel.model_name,
      _model_module: SidecarModel.model_module,
      _model_module_version: SidecarModel.model_module_version,
      _view_name: SidecarModel.view_name,
      _view_module: SidecarModel.view_module,
      _view_module_version: SidecarModel.view_module_version,
      title: 'Sidecar',
      anchor: 'right',
      ref: null,
      _widget_id: null,
    };
    
    get created() {
      return this._viewCreated.promise;
    }
    
    public resolveCreated() {
      this._viewCreated.resolve();
    }
    
    private _viewCreated = new PromiseDelegate();  // Import this from '@lumino/coreutils'
    
    // You also need to deserialize the ref property
    static serializers = {
      ...DOMWidgetModel.serializers,
      ref: { deserialize: unpack_models as any }, // import unpack_models from '@jupyter-widgets/base'
    };
  }

  initialize(attributes: any, options: any) {
    super.initialize(attributes, options);

    // create_view calls the view's render function, which will display this widget in the sidebar.
    this.widget_manager.create_view(this as DOMWidgetModel, {});
  }

  static model_name = 'SidecarModel';
  static view_name = 'SidecarView';
  static model_module = '@jupyter-widgets/jupyterlab-sidecar';
  static view_module = '@jupyter-widgets/jupyterlab-sidecar';
  static model_module_version = EXTENSION_SPEC_VERSION;
  static view_module_version = EXTENSION_SPEC_VERSION;
}
