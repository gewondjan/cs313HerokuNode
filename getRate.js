const calculateRate = require('./calculateRate.js');

module.exports = function getRate(req, res) {

    let packageWeight = req.query.weight;
    let packageType = req.query.packageType;
    let fullNameOfType = new Map([['LS', 'Letters (Stamped)'], ['LM', 'Letters (Metered)'], ['LEF', 'Large Envelopes (Flats)'], ['FCPSR', 'First-Class Package Service-Retail']]);
    let itemsToRender = {
        packageWeight: packageWeight,
        packageType: fullNameOfType.get(packageType),
        finalCost: calculateRate(packageWeight, packageType)
    }
    res.render('pages/rate', itemsToRender);
}