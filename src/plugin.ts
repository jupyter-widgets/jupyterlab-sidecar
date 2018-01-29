// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
    uuid
} from '@jupyterlab/coreutils';

import {
  Widget
} from '@phosphor/widgets';

import {
  IJupyterWidgetRegistry
 } from '@jupyter-widgets/base';

// TODO: import from @jupyter-widgets/jupyterlab-manager once Output is
// exported by the main module.
import {
   OutputView
} from '@jupyter-widgets/jupyterlab-manager/lib/output';

import {
  SidecarModel
} from './widget';

import {
  EXTENSION_SPEC_VERSION
} from './version';

import '../css/sidecar.css';

const EXTENSION_ID = '@jupyter-widgets/jupyterlab-sidecar';

/**
 */
const sidecarPlugin: JupyterLabPlugin<void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true
};

export default sidecarPlugin;


/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app: JupyterLab, registry: IJupyterWidgetRegistry): void {
    let SidecarView = class extends OutputView {
      model: SidecarModel;

      render() {
        if (!this.model.rendered) {
          super.render();
          let w = this._outputView;
          w.addClass('jupyterlab-sidecar');
          w.addClass('jp-LinkedOutputView');
          w.title.label = this.model.get('title');
          w.title.closable = true;
          app.shell['_rightHandler'].sideBar.tabCloseRequested.connect((sender : any, tab : any) => {
              tab.title.owner.dispose();
          });
          w.id = uuid();
          if (Object.keys(this.model.views).length > 1) {
            w.node.style.display = 'none';
            let key = Object.keys(this.model.views)[0];
            this.model.views[key].then((v: OutputView) => {
              v._outputView.activate();
            });
          } else {
            app.shell.addToRightArea(w);
            app.shell.expandRight();
          }
          var that = this;
        }
      }
    }

    registry.registerWidget({
      name: '@jupyter-widgets/jupyterlab-sidecar',
      version: EXTENSION_SPEC_VERSION,
      exports: {
        SidecarModel: SidecarModel,
        SidecarView: SidecarView
      }
  });
}
