var { Listing, Asset, User } = require("../models/models");

async function getSingleListing(req, res, next) {
	try {
		let listingData = await Listing.findByPk(parseInt(req.params.id), { include: [Asset, User] });
		res.json(listingData);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllListings(req, res, next) {
	try {
		let listingData = await Listing.findAll({ include: [Asset, User] });
		res.json(listingData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function createSingleListing(req, res, next) {
	try {
		let listingData = await Listing.create({
			title: req.fields.title,
			description: req.fields.description,
			assetId: req.fields.assetid,
			userid: req.fields.userid,
			categoryId: req.fields.categoryid
		});
		res.json(listingData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function updateSingleListing(req, res, next) {
	try {
		let listingData = await Listing.update({
			title: req.fields.title,
			description: req.fields.description,
			assetId: req.fields.assetid,
			categoryId: req.fields.categoryid
		}, {
			where: {
				id: parseInt(req.params.id)
			},
			returning: true
		});
		res.json(listingData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

async function deleteSingleListing(req, res, next) {
	try {
		await Listing.destroy({ where: { id: parseInt(req.params.id) } });
		res.status(204).end();
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleListing,
	getSingleListing,
	getAllListings,
	updateSingleListing,
	deleteSingleListing
};
