package utm.mu.rsk.microfinance.rskservice.repository.product.entity;

import javax.persistence.*;

@Entity
@Table(name = "PRODUCTS")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PRODUCTS_SEQ")
    @SequenceGenerator(sequenceName = "PRODUCTS_SEQ", allocationSize = 1, name = "PRODUCTS_SEQ")
    private int id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "TITLE")
    private String title;

    @Lob
    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "AMOUNT")
    private int amount;

    @Column(name = "TYPE")
    private String type;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
