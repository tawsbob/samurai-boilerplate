/* eslint-disable */
const metadata = {
    fields: {
        user: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            email: {
                name: 'email',
                type: 'String',
            },
            password: {
                name: 'password',
                type: 'String',
            },
            name: {
                name: 'name',
                type: 'String',
                isOptional: true,
            },
            todos: {
                name: 'todos',
                type: 'Todo',
                isDataModel: true,
                isArray: true,
                backLink: 'user',
            },
        },
        todo: {
            id: {
                name: 'id',
                type: 'String',
                isId: true,
                attributes: [{ name: '@default', args: [] }],
            },
            title: {
                name: 'title',
                type: 'String',
            },
            completed: {
                name: 'completed',
                type: 'Boolean',
                attributes: [{ name: '@default', args: [{ value: false }] }],
            },
            createdAt: {
                name: 'createdAt',
                type: 'DateTime',
                attributes: [{ name: '@default', args: [] }],
            },
            updatedAt: {
                name: 'updatedAt',
                type: 'DateTime',
                attributes: [{ name: '@updatedAt', args: [] }],
            },
            user: {
                name: 'user',
                type: 'User',
                isDataModel: true,
                backLink: 'todos',
                isRelationOwner: true,
                foreignKeyMapping: { id: 'userId' },
            },
            userId: {
                name: 'userId',
                type: 'String',
                isForeignKey: true,
            },
        },
    },
    uniqueConstraints: {
        user: {
            id: {
                name: 'id',
                fields: ['id'],
            },
            email: {
                name: 'email',
                fields: ['email'],
            },
        },
        todo: {
            id: {
                name: 'id',
                fields: ['id'],
            },
        },
    },
    deleteCascade: {
        user: ['Todo'],
    },
    authModel: 'User',
};
export default metadata;
