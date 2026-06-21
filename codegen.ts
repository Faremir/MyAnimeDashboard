import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://graphql.anilist.co',
    documents: ['src/lib/providers/anilist/**/*.graphql'],
    generates: {
        'src/lib/providers/anilist/anilist.generated.ts': {
            plugins: ['typescript-operations', 'typed-document-node'],
            config: {
                useTypeImports: true,
                enumType: 'string-literal',
            },
        },
    },
};

export default config;
