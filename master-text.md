Book json:{
    id: 1,
    title: "John",
    author:"Doe",
    currentPrice: 10,
    previousPrice:20,
    description:"This is description"
    coverImage:"",
    availableQuantity:"",
    tags:[],
}

// todo:address verification system

User json:{
        id,
        name,
        email,
        password,
        phone,
        address,
        ip,
        cookies,
        cart,
        orders,
        wishlist,
        reviews,
        ratings,
        profileImage,
    }

    
Coupon json:{
        id: 1,
        code: "ABC",
        name: "10% off",
        description: "10% off on all products",
        discount: 10,
        discountType: "percentage",
        discountLimit: 200,
        discountLimitType: "amount",
        discountLimitPerUser: 1,
    }

Order json:{
    id:1, 
    date,
    userInfo:{
        name, // or firstName and lastName 
        address, 
        pinCode, 
        phoneNumber,

    },
    orderInfo:{
        books:[
            bookId, bookName, price
        ],
        totalPrice, 
        offerCode
    }
}


Api list:

Books:
get
getBooksByTag
search

Book:
get

Orders:
post


Order
post
get
