// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { UUID } from '@lumino/coreutils';

import { IJupyterWidgetRegistry, WidgetView } from '@jupyter-widgets/base';

import { output } from '@jupyter-widgets/jupyterlab-manager';

import { SidecarModel } from './widget';

import { EXTENSION_SPEC_VERSION } from './version';

const EXTENSION_ID = '@jupyter-widgets/jupyterlab-sidecar';

const sidecarPlugin: JupyterFrontEndPlugin<void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: (app: JupyterFrontEnd, registry: IJupyterWidgetRegistry): void => {
    const SidecarView = class extends output.OutputView {
      model: SidecarModel;

      async render() {
        if (!this.model.rendered) {
          super.render();

          const w = this._outputView;
          w.addClass('jupyterlab-sidecar');
          w.addClass('jp-LinkedOutputView');
          w.title.label = this.model.get('title');
          w.title.closable = true;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          app.shell._rightHandler.sideBar.tabCloseRequested.connect(
            (sender: any, tab: any) => {
              tab.title.owner.dispose();
            }
          );
          w.id = UUID.uuid4();
          this.model.set('_widget_id', w.id);
          if (this.model.views && Object.keys(this.model.views).length > 1) {
            w.node.style.display = 'none';
            const key = Object.keys(this.model.views)[0];
            this.model.views[key].then((v: WidgetView) => {
              if (v instanceof output.OutputView) {
                v._outputView.activate();
              }
            });
          } else {
            const anchor = this.model.get('anchor') || 'right';
            const ref = this.model.get('ref') || null;
            if (ref) {
              await ref.created();
            }
            if (anchor === 'right') {
              app.shell.add(w, 'right');
            } else {
              app.shell.add(w, 'main', { ref: ref.get('_widget_id'), mode: anchor });
            }
            app.shell.activateById(w.id);
            this.model.resolveCreated();
          }
        }
      }
    };

    registry.registerWidget({
      name: '@jupyter-widgets/jupyterlab-sidecar',
      version: EXTENSION_SPEC_VERSION,
      exports: {
        SidecarModel,
        SidecarView
      }
    });
  },
  autoStart: true
};

export default sidecarPlugin;
