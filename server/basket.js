import { Router } from 'express';

const router = Router();

// Pull random fruit quantity between 1 and 100 to fill basket
// Assuming the qty would come from the database based on customer action (such as qty added to cart)
const basketQtyRandomizer = () => Math.floor((Math.random() * 100) + 1);

// Pull a randomized fruit basket
function basketGet(req, res) {
  console.log(req, res);
  res.send({
    ids: [1, 2, 3, 4, 5],
    data: {
      1: {
        id: 1,
        name: 'apple',
        qty: basketQtyRandomizer(),
        unitPrice: 0.25,
        saleQty: null, 
        salePrice: null,
      },
      2: {
        id: 2,
        name: 'orange',
        qty: basketQtyRandomizer(),
        unitPrice: 0.30,
        saleQty: null,
        salePrice: null,
      },
      3: {
        id: 3,
        name: 'banana',
        qty: basketQtyRandomizer(),
        unitPrice: 0.10,
        saleQty: null,
        salePrice: null,
      },
      4: {
        id: 4,
        name: 'kiwi',
        qty: basketQtyRandomizer(),
        unitPrice: 0.15,
        saleQty: 5, // must be purchased in multiples of 3 to get sale price
        salePrice: 0.09, // cost per kiwi if purchased in qtys of 3
      },
      5: {
        id: 5,
        name: 'papaya',
        qty: basketQtyRandomizer(),
        unitPrice: 0.50,
        saleQty: 3, // must be purchased in multiples of 3 to get sale price
        salePrice: 0.3333333, // cost per papaya if purchased in qtys of 3
      },
    },
  });
}

router.get('', basketGet);

export const basketRouter = router;