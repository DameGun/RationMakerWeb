import {Button} from "reactstrap";
import ProductsFilter from "../ProductsFilter";
import {useState} from "react";

const CategoryButtons = ({ setResults, categories, products, setCurrentCategory }) => {
    const [active, setActive] = useState("")
    
    const handleClick = (event) => {
        event === "all" ? setActive("all") : setActive(event.target.id)
    }
    
    const filterProducts = (currentCategory, e) => {
        handleClick(e);
        setCurrentCategory(currentCategory);
        ProductsFilter({setResults, categories, currentCategory, products});
    }
    
    return (
        <>
            <Button
                className={active === "all" ? "active" : undefined}
                onClick={() => filterProducts("", "all")}>
                Все продукты
            </Button>
            {categories.map(category => {
                return(
                    <Button
                        key={category.id}
                        id={category.id}
                        size="sm"
                        className={active === category.id.toString() ? "active" : undefined}
                        onClick={(e) => filterProducts(category.name, e)}>
                        {category.name}
                    </Button>
                );
            })}
        </>
    )
}

export default CategoryButtons;