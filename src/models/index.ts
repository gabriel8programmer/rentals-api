import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM("CLIENT", "AGENT", "ADMIN"),
        defaultValue: "CLIENT"
    },
    emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, { timestamps: true })

export const Client = sequelize.define("Client", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rg: {
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
            model: User,
            key: "id"
        },
    }
}, { timestamps: true })

export const Agent = sequelize.define("Agent", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING
    },
    license: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    }
}, {timestamps: true}) 

export const PropertyType = sequelize.define("PropertyType", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false })

export const Property = sequelize.define("Property", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM("Available", "Rented", "Under_maintenance"),
        defaultValue: "Available"
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    size: {
        type: DataTypes.DECIMAL(10, 2),
    },
    bedrooms: {
        type: DataTypes.INTEGER,
    },
    bathrooms: {
        type: DataTypes.INTEGER
    },
    location: {
        type: DataTypes.JSONB
    },
    typePropertyId: {
        type: DataTypes.UUID,
        references: {
            model: PropertyType,
            key: "id"
        }
    }
}, {timestamps: true })

export const PropertyImage = sequelize.define("PropertyImage", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCover: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  propertyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Property,
      key: "id"
    }
  }
}, { timestamps: true })

export const RentalRequest = sequelize.define("RentalRequest", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Client,
            key: "id"
        }
    },
    propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Property,
            key: "id"
        }
    },
    budget: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("Processing", "Accepted", "Cancelled"),
        defaultValue: "Processing"
    }
}, {timestamps: true})

export const Rental = sequelize.define("Rental", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    clientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Client,
            key: "id"
        }
    },
    propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Property,
            key: "id"
        }
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    contractInitDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    constractEndDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, { timestamps: true })

export const PaymentMethod = sequelize.define("PaymentMethod", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false})

export const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    paymentMethodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PaymentMethod,
            key: "id" 
        }
    },
    rentalId: {
        type: DataTypes.UUID,
        references: {
            model: Rental,
            key: "id"
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Pending", "Paid", "Failed", "Refunded"),
        defaultValue: "Pending"
    },
    paymentDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {timestamps: true})

export const RequestMaintenance = sequelize.define("RequestMaintenance", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    rental: {
        type: DataTypes.UUID,
        references: {
            model: Rental,
            key: "id"
        }
    },
    status: {
        type: DataTypes.ENUM("Processing", "Accepted", "Refused", "Cancelled"),
        defaultValue: "Processing"
    }
}, {timestamps: true})

export const Maintenance = sequelize.define("Maintenance", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    rental: {
        type: DataTypes.UUID,
        references: {
            model: Rental,
            key: "id"
        }
    },
    status: {
        type: DataTypes.ENUM("In_Progress", "Finished", "Cancelled"),
        defaultValue: "In_Progress"
    },
    amound: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false        
    },
    notes: {
        type: DataTypes.STRING
    }
},{timestamps: true})