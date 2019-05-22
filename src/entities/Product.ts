export class Product {
    public id: string;
    public ean: string;
    public title: string;
    public brand: string;
    public shortdescription: string;
    public fulldescription: string;
    public image: string;
    public weight: string;
    public price: string;
    public category: string;
    public subcategory: string;
    public subsubcategory: string;

    constructor(
        id: string,
        ean: string,
        title: string,
        brand: string,
        shortdescription: string,
        fulldescription: string,
        image: string,
        weight: string,
        price: string,
        category: string,
        subcategory: string,
        subsubcategory: string,
    ) {
        this.id = id;
        this.ean = ean;
        this.title = title;
        this.brand = brand;
        this.shortdescription = shortdescription;
        this.fulldescription = fulldescription;
        this.image = image;
        this.weight = weight;
        this.price = price;
        this.category = category;
        this.subcategory = subcategory;
        this.subsubcategory = subsubcategory;
    }
}
