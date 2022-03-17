const mongoose = require('mongoose');
const Product = require('./models/product');

const products = [
    {
        name:"iPhone 12",
        img:"https://images.unsplash.com/photo-1611472173362-3f53dbd65d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lJTIwMTJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60 ",
        price: 80000 ,
        desc:"Super Retina XDR Display, 6.1 inch (Diagonal) All Screen OLED Display, HDR Display, True Tone, Wide Colour (P3), Haptic Touch, 2000000:1 Contrast Ratio (Typical), 625 nits Max Brightness (Typical); 1200 nits Max Brightness (HDR), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously"
    },
    {
        name:" Mackbook air",
        img:" https://images.unsplash.com/photo-1521383899078-1c7c03c76b59?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFja2Jvb2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 125000 ,
        desc:"MacBook Air is completely transformed by the power of Apple-designed M1 chip. Up to 3.5x faster CPU, 5x faster graphics and 18 hours of battery life. "
    },
    {
        name:"oneplus 6T ",
        img:"https://images.unsplash.com/photo-1592726664819-98c3e9f8b10c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fG9uZXBsdXMlMjA2dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60 ",
        price: 25000 ,
        desc:"Unlock your OnePlus 6T with the fastest in-display fingerprint sensor on any smartphone. We are setting a new industry standard with our cutting-edge Screen Unlock technology. "
    },
    {
        name:"Asus Rog ",
        img:"https://images.unsplash.com/photo-1611134612965-d0ba82a139b2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YXN1cyUyMHJvZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60 ",
        price: 150000,
        desc:"ROG was founded with the goal of creating the world's most powerful and versatile gaming laptops in the industry. Our premium devices elevate gaming ... "
    },
    {
        name:"Rolex ",
        img:" https://images.unsplash.com/photo-1605101232508-283d0cd4909e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9sZXh8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: 180000 ,
        desc:"The ultimate watch of prestige ... Rolex watches are crafted with scrupulous attention to detail. Explore the Rolex collection of prestigious, high-precision "
    },
    {
        name:" Samsung fold ",
        img:"https://images.unsplash.com/photo-1581993192008-63e896f4f744?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8c2Ftc3VuZyUyMGZvbGR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60 ",
        price: 65000 ,
        desc:"The Galaxy Fold is pioneering the seamless integration of hardware and software for a foldable device. Use up to three apps simultaneously "
    },
    {
        name:" Acer aspire 7 ",
        img:"https://images.unsplash.com/photo-1612688242445-c057ca80e837?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFjZXJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60 ",
        price: 65000,
        desc:"Acer Aspire 7 Gaming Laptop Intel Core i5 10th Gen - (8GB RAM/512 GB SSD/NVIDIA GTX 1650/Windows 10 home/60hz) A715-75G with 39.6cm (15.6 inches) FHD display  "
    },
];


const seedDB = async ()=>{
    await Product.insertMany(products);
    console.log('DB seeded');
}


module.exports = seedDB;