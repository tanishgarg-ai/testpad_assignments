function getBasicBillInfo(bill, items) {
    const basicBill = {
        id: bill.id,
        billNumber: bill.billNumber,
        opentime: bill.opentime,
        customerName: bill.customerName,
        billItems: []
    };

    bill.billItems.forEach(billItem => {
        const item = items.find(i => i.id === billItem.id);
        if (item) {
            basicBill.billItems.push({
                id: billItem.id,
                name: item.itemName,
                quantity: billItem.quantity
            });
        }
    });
    return basicBill;
}


function getDetailedBillWithAmount(bill, items, categories) {
    const detailedBill = {
        id: bill.id,
        billNumber: bill.billNumber,
        opentime: bill.opentime,
        customerName: bill.customerName,
        billItems: [],
        "Total Amount": 0
    };

    let totalAmount = 0;

    bill.billItems.forEach(billItem => {
        const item = items.find(i => i.id === billItem.id);
        if (item) {
            let categoryName = "";
            let superCategoryName = "";
            if (item.category) {
                const category = categories.find(c => c.id === item.category.categoryId);
                if (category) {
                    categoryName = category.categoryName;
                    if (category.superCategory) {
                        superCategoryName = category.superCategory.superCategoryName;
                    }
                }
            }

            let itemAmount = item.rate * billItem.quantity;

            let discountAmount = 0;
            if (billItem.discount) {
                if (billItem.discount.isInPercent === 'Y') {
                    discountAmount = itemAmount * (billItem.discount.rate / 100);
                } else {
                    discountAmount = billItem.discount.rate * billItem.quantity;
                }
                itemAmount -= discountAmount;
            }

            let taxes = [];
            if (item.taxes && item.taxes.length > 0) {
                taxes = item.taxes.map(tax => {
                    let taxAmount;
                    if (tax.isInPercent === 'Y') {
                        taxAmount = itemAmount * (tax.rate / 100);
                    } else {
                        taxAmount = tax.rate * billItem.quantity;
                    }
                    itemAmount += taxAmount;
                    return tax;
                });
            }

            totalAmount += itemAmount;

            detailedBill.billItems.push({
                id: billItem.id,
                name: item.itemName,
                quantity: billItem.quantity,
                discount: billItem.discount,
                taxes: taxes,
                amount: itemAmount,
                superCategoryName: superCategoryName,
                categoryName: categoryName
            });
        }
    });

    detailedBill["Total Amount"] = totalAmount;
    return detailedBill;
}

const items = [
    {
        id: "item1",
        itemName: "Butter Roti",
        rate: 20,
        taxes: [
            {
                name: "Service Charge",
                rate: 10,
                isInPercent: 'Y'
            }
        ],
        category: {
            categoryId: "C2"
        }
    },
    {
        id: "item2",
        itemName: "Paneer Butter Masala",
        rate: 150,
        taxes: [
            {
                name: "Service Charge",
                rate: 10,
                isInPercent: 'Y'
            }
        ],
        category: {
            categoryId: "C1"
        }
    }
];

// const categories = [
//     {
//         id: "C1",
//         categoryName: "Platters",
//         superCategory: {
//             superCategoryName: "South Indian",
//             id: "SC1"
//         }
//     },
//     {
//         id: "C2",
//         categoryName: "Breads",
//         superCategory: {
//             superCategoryName: "North Indian",
//             id: "SC2"
//         }
//     }
// ];
//
// const bill = {
//     id: "B1",
//     billNumber: 1,
//     opentime: "06 Nov 2020 14:19",
//     customerName: "CodeQuotient",
//     billItems: [
//         {
//             id: "item2",
//             quantity: 3,
//             discount: {
//                 rate: 10,
//                 isInPercent: 'Y'
//             }
//         }
//     ]
// };
//
// // const basicBill = getBasicBillInfo(bill, items);
// // console.log(basicBill);
//
// const detailedBill = getDetailedBillWithAmount(bill, items, categories);
// console.log(detailedBill);