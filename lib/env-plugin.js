'use strict';

const { getValue } = require('./utils');

function envPlugin() {
  return {
    name: 'ember-env-macros',
    visitor: {
      ImportSpecifier(path, state) {
        if (path.parent.source.value === 'ember-env-macros') {
          const importedName = path.node.imported.name;
          if (importedName === 'configEnv') {
            state.configImportId =
              state.configImportId ||
              path.scope.generateUidIdentifierBasedOnNode(path.node);
            path.scope.rename(path.node.local.name, state.configImportId.name);
            path.remove();
          }

          if (importedName === 'buildEnv') {
            state.buildImportId =
              state.buildImportId ||
              path.scope.generateUidIdentifierBasedOnNode(path.node);
            path.scope.rename(path.node.local.name, state.buildImportId.name);
            path.remove();
          }

          if (path.parent.specifiers.length === 0) {
            path.parentPath.remove();
          }
        }
      },

      CallExpression(path, state) {
        if (
          state.configImportId &&
          path.node.callee.name === state.configImportId.name
        ) {
          path.replaceWithSourceString(
            JSON.stringify(
              getValue(
                state.opts.configEnv,
                ...path.node.arguments.map(e => e.value)
              )
            )
          );
        } else if (
          state.buildImportId &&
          path.node.callee.name === state.buildImportId.name
        ) {
          path.replaceWithSourceString(
            JSON.stringify(
              getValue(
                state.opts.buildEnv,
                ...path.node.arguments.map(e => e.value)
              )
            )
          );
        }
      },
    },
  };
}

module.exports = envPlugin;
