exports.get404 = (res, req, next) => {
    res.status(404).render('404', { pageTitle: 'Page not Found' });
};
