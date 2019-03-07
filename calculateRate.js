module.exports = function calculateRate(req, res) {

    let packageWeight = req.query.weight;
    let packageType = req.query.packageType;

    let LS = new Map([[1, .55], [2, .70], [3, .85], [3.5, 1.00]]);
    let LM = new Map([[1, .50], [2, .65], [3, .80], [3.5, .95]]);
    let LEF = new Map([[1, 1.00], [2, 1.15], [3, 1.30], [4, 1.45], [5, 1.60], [6, 1.75], [7, 1.90], [8, 2.05], [9, 2.20], [10, 2.35], [11, 2.50], [12, 2.65], [13, 2.80]]);
    let FCPSR = new Map([[4, 3.66], [8, 4.39], [12, 5.19], [13, 5.71]]);
    let allPostage = new Map([['LS', LS], ['LM', LM], ['LEF', LEF], ['FCPSR', FCPSR]]);

    let finalCost = 0;

    //The only way to quit out of array.prototype.forEach is to throw an exception.
    try {
        allPostage.get(packageType).forEach(function(price, weight) {
            if (packageWeight <= weight) {
                finalCost = price;
                throw "We found it";
            }
        });
    } catch(exception) {
        //Do nothing, we just wanted to stop the looping.
    }
        
    let itemsToRender = {
        packageWeight: packageWeight,
        packageType: packageType,
        finalCost: finalCost
    }

    res.render('pages/rate', itemsToRender);
    
 }