import AuthenticatedRoute from 'ghost-admin/routes/authenticated';

export default AuthenticatedRoute.extend({
    model(params, transition) {
        let {type: modelName} = params;

        if (!['post','page'].includes(modelName)) {
            let path = transition.intent.url.replace(/^\//, '');
            return this.replaceWith('error404', {path, status: 404});
        }

        return this.get('session.user').then(user => (
            this.store.createRecord(modelName, {authors: [user]})
        ));
    },

    // there's no specific controller for this route, instead all editor
    // handling is done on the editor route/controler
    setupController(controller, newPost) {
        let editor = this.controllerFor('editor');
        editor.setPost(newPost);
    },

    buildRouteInfoMetadata() {
        return {
            mainClasses: ['editor-new']
        };
    }
});