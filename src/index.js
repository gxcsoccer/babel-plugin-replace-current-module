import { join } from 'path';

export default ({ types }) => {
  const cwd = process.cwd();
  const pkg = require(join(cwd, 'package.json'));

  return {
    visitor: {
      MemberExpression(path) {
        const { node } = path;
        const { object, property } = node;
        if (types.isIdentifier(object, { name: 'window' }) &&
          types.isStringLiteral(property, { value: '@@module' })) {
          path.replaceWith(
            types.memberExpression(types.Identifier('window'), types.stringLiteral(pkg.name), true)
          );
          return;
        }
      },
      CallExpression(path) {
        const { node } = path;
        const args = node.arguments;
        const isRequire = types.isIdentifier(node.callee, { name: 'require' });
        const bingo =
          isRequire &&
          args.length === 1 &&
          types.isStringLiteral(args[0], { value: '@@module' });

        if (bingo) {
          path.replaceWith(
            types.callExpression(
              types.Identifier('require'), [types.stringLiteral(join(cwd, pkg.main || 'index.js'))]
            ));
          return;
        }
      },
    },
  };
};
