const validation = (product, productNames, nameProds)=>{
    let errors = {};

    const validUrl = /((www\.|(http|https|ftp|news|file)+\:\/\/)[_.a-z0-9-]+\.[a-z0-9\/_:@=.+?,##%&~-]*[^.|\'|\# |!|\(|?|,| |>|<|;|\)])/;
    
    
    productNames = productNames?.filter((prod)=>{
        return prod.nameProd?.toLowerCase() === product.name?.toLowerCase() && prod.nameProd?.toLowerCase() !== nameProds?.toLowerCase()
    });
    console.log(productNames);
    console.log(nameProds);
    console.log(product.name);
    if(productNames[0]?.nameProd!==undefined) {
        errors.name = 'Name already exist'
        return errors   
    }else if(product.name?.length>35) {
        errors.name = 'Name can´t be larger than 35 characters'
        return errors
    }else if(product.name?.length === 0){
        errors.name = 'Name can´t be blank'
        return errors
    }else if(product.name?.length<3){
        errors.name = 'Name can´t be less than 3 characters'
        return errors
    }else if(product.category?.length=== 0){
        errors.category = 'You have to select a Category'
        return errors
    }else if(product.brand?.length>35) {
        errors.name = 'Brand can´t be larger than 35 characters'
        return errors
    }else if(product.brand?.length === 0){
        errors.brand = 'Brand can´t be blank'
        return errors
    }else if(product.brand?.length<3){
        errors.brand = 'Brand can´t be less than 3 characters'
        return errors
    }else if(product.description?.length>255) {
        errors.description = 'Description can´t be larger than 255 characters'
        return errors
    }else if(product.description?.length === 0){
        errors.description = 'Description can´t be blank'
        return errors
    }else if(product.description?.length<50){
        errors.description = 'Description can´t be less than 50 characters'
        return errors
    }else if(isNaN(product?.price)){
        errors.price = 'Price can only be numbers'
        return errors
    }else if(Number(product?.price)<1){
        errors.price = 'Price is too low'
        return errors
    }else if(isNaN(product?.discountPercentage)){
        errors.discountPercentage = 'Discount Percentage can only be numbers'
        return errors
    }else if(Number(product?.discountPercentage)<0){
        errors.discountPercentage = 'Discount Percentage can´t be less than 0'
        return errors
    }else if(Number(product?.discountPercentage)>100){
        errors.discountPercentage = 'Discount Percentage can´t be greater than 100'
        return errors
    }else if(product?.image.length === 0){
        errors.image = 'You need to provide at least 1 image'
        return errors}

    product.image?.map((img, index) => {
        if (!validUrl.test(img)) {
            if (errors.image) {
                errors.image += ', ';
            } else {
                errors.image = '';
            }
            errors.image += 'Please enter a valid url at image url: ' + ++index;
        }
    });
    if (errors.image) return errors;
    if(isNaN(product?.stock)){
        errors.stock = 'Stock can only be numbers'
        return errors
    }else if(Number(product?.stock)<0){
        errors.stock = 'Stock can´t be less than 0'
        return errors
    }else if(product?.stock == 0 && product?.active) {
        errors.stock = 'You can´t set product to Active with 0 stock'
        return errors
    }

    return errors
}

export default validation;