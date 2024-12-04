import pluginJs from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // files: ['**/*.{js,mjs,cjs,ts}'],
    files: ['**/*.ts'],
    ignores: ['**/node_modules/', '**/dist/'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'all',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          importOrderParserPlugins: ['typescript', 'decorators-legacy'],
          importOrder: ['^(express|node?/?([a-zA-Z/]*))$', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
          importOrderSeparation: true,
          importOrderSortSpecifiers: true,
          plugins: ['@trivago/prettier-plugin-sort-imports'],
        },
      ],
    },
  },
]
