'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

exports.default = function (_ref) {
  var types = _ref.types;

  var cwd = process.cwd();
  var pkg = require((0, _path.join)(cwd, 'package.json'));

  return {
    visitor: {
      MemberExpression: function MemberExpression(path) {
        var node = path.node;
        var object = node.object;
        var property = node.property;

        if (types.isIdentifier(object, {
          name: 'window'
        }) && types.isStringLiteral(property, {
          value: '@@module'
        })) {
          return path.replaceWith(types.memberExpression(types.Identifier('window'), types.stringLiteral(pkg.name), true));
        }
      },
      CallExpression: function CallExpression(path) {
        var node = path.node;

        var args = node.arguments;
        var isRequire = types.isIdentifier(node.callee, {
          name: 'require'
        });
        var bingo = isRequire && args.length === 1 && types.isStringLiteral(args[0], {
          value: '@@module'
        });

        if (bingo) {
          return path.replaceWith(types.callExpression(types.Identifier('require'), [types.stringLiteral((0, _path.join)(cwd, pkg.main || 'index.js'))]));
        }
      }
    }
  };
};

module.exports = exports['default'];