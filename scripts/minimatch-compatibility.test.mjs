import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';

// Resolve from each actual consumer, not an unrelated top-level minimatch.
const store = path.resolve('node_modules/.pnpm');
const entries = readdirSync(store);
function consumers(name) {
  const prefix = `${name.replace('/', '+')}@`;
  const matches = entries.filter((entry) => entry.startsWith(prefix));
  assert.ok(matches.length, `Missing installed consumer: ${name}`);
  return matches.map((entry) => {
    const root = path.join(store, entry, 'node_modules', name);
    return { root, require: createRequire(path.join(root, 'package.json')) };
  });
}

for (const { root, require } of consumers('@oclif/core')) {
  const version = require('./package.json').version;
  test(`oclif ${version} selects scoped CLI plugins with patched minimatch`, async () => {
    assert.equal(require('minimatch/package.json').version, '11.0.4');
    const { default: PluginLoader } = require(path.join(root, 'lib/config/plugin-loader.js'));
    const loader = new PluginLoader({ root });
    const selected = [];
    loader.loadPlugins = async (_root, type, names) => selected.push({ type, names });
    await loader.loadCorePlugins({
      rootPlugin: {
        root,
        pjson: {
          oclif: { plugins: ['@sanity/plugin-*', 'exact-plugin'] },
          dependencies: {
            '@sanity/plugin-help': '*',
            '@sanity/plugin-build': '*',
            'exact-plugin': '*',
            '@sanity/unrelated': '*',
            'other-plugin': '*',
          },
        },
      },
    });
    assert.deepEqual(selected[0], {
      type: 'core',
      names: ['@sanity/plugin-help', '@sanity/plugin-build', 'exact-plugin'],
    });
  });
}

test('typescript-estree retains named matching and dot-file project patterns', () => {
  for (const { require } of consumers('@typescript-eslint/typescript-estree')) {
    assert.equal(require('minimatch/package.json').version, '11.0.4');
    const { minimatch } = require('minimatch');
    assert.equal(minimatch('.config.ts', '*.ts', { dot: true }), true);
    assert.equal(minimatch('scripts/check.ts', 'scripts/*.ts', { dot: true }), true);
    assert.equal(minimatch('scripts/check.js', 'scripts/*.ts', { dot: true }), false);
    assert.equal(minimatch('scripts/nested/check.ts', 'scripts/*.ts', { dot: true }), false);
  }
});

test('legacy lint and filelist consumers keep callable and makeRe APIs', () => {
  for (const name of ['@eslint/config-array', '@eslint/eslintrc', 'eslint',
    'eslint-plugin-import', 'eslint-plugin-jsx-a11y', 'eslint-plugin-react', 'filelist']) {
    for (const { require } of consumers(name)) {
      const version = require('minimatch/package.json').version;
      assert.match(version, name === 'filelist' ? /^5\./ : /^3\./);
      const minimatch = require('minimatch');
      assert.equal(typeof minimatch, 'function');
      assert.equal(minimatch('src/example.ts', '**/*.ts'), true);
      assert.equal(minimatch.makeRe('**/*.ts').test('src/example.ts'), true);
    }
  }
});
