const user = require("../models/user");

const index = async (req, res) => {
    try {
        const currentUser = await user.findById(req.session.user._id);

        res.render('applications/index.ejs', {
            applications: currentUser.applications,
            user: currentUser,
        });

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const newApplication = async (req, res) => {
    res.render('applications/new.ejs', {
        user: req.session.user,
    });
};

const create = async (req, res) => {
    try {
        const currentUser = await user.findById(req.session.user._id);

        currentUser.applications.push(req.body);

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/applications`);

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

const show = async (req, res) => {
    try {
        const currentUser = await user.findById(req.session.user._id);

        const application = currentUser.applications.id(
            req.params.applicationId
        );

        res.render('applications/show.ejs', {
            application: application,
        });

    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

module.exports = {
    index,
    newApplication,
    create,
    show
};