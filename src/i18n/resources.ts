export const resources = {
  en: {
    translation: {
      navigation: {
        orders: 'Orders',
        products: 'Products',
      },

      topMenu: {
        title: 'Orders & Products',
        activeSessions: 'Active sessions',
      },

      orders: {
        title: 'Orders',
        addOrder: 'Add order',
        products: 'Products',

        loading: 'Loading orders...',
        delete: 'Delete',

        details: {
          date: 'Date',
          products: 'Products',
          total: 'Total',
          noProducts: 'This order has no products.',
          close: 'Close order details',
        },

        deleteModal: {
          title: 'Delete order',
          message: 'Are you sure you want to delete',
          warning:
            'All products linked to this order will also be removed.',
          cancel: 'Cancel',
          delete: 'Delete',
          deleting: 'Deleting...',
        },

        createModal: {
          title: 'Create order',
          titleField: 'Title',
          description: 'Description',
          date: 'Date',
          create: 'Create order',
          creating: 'Creating...',
          close: 'Close create order form',
        },

        validation: {
          titleMin: 'Title must contain at least 2 characters',
          titleMax: 'Title must contain no more than 80 characters',
          descriptionMin:
            'Description must contain at least 2 characters',
          descriptionMax:
            'Description must contain no more than 300 characters',
          dateRequired: 'Date is required',
        },
      },

      products: {
        title: 'Products',
        type: 'Type',
        all: 'All',
        guarantee: 'Guarantee',
        price: 'Price',
        order: 'Order',
        noProducts: 'No products found.',
        unknownOrder: 'Unknown order',
      },

      common: {
        language: 'Language',
      },
    },
  },

  uk: {
    translation: {
      navigation: {
        orders: 'Приходи',
        products: 'Продукти',
      },

      topMenu: {
        title: 'Приходи та продукти',
        activeSessions: 'Активні сесії',
      },

      orders: {
        title: 'Приходи',
        addOrder: 'Додати приход',
        products: 'Продукти',

        loading: 'Завантаження приходів...',
        delete: 'Видалити',

        details: {
          date: 'Дата',
          products: 'Продукти',
          total: 'Сума',
          noProducts: 'У цьому приході немає продуктів.',
          close: 'Закрити інформацію про приход',
        },

        deleteModal: {
          title: 'Видалити приход',
          message: 'Ви впевнені, що хочете видалити',
          warning:
            'Усі продукти, пов’язані з цим приходом, також будуть видалені.',
          cancel: 'Скасувати',
          delete: 'Видалити',
          deleting: 'Видалення...',
        },

        createModal: {
          title: 'Створити приход',
          titleField: 'Назва',
          description: 'Опис',
          date: 'Дата',
          create: 'Створити приход',
          creating: 'Створення...',
          close: 'Закрити форму створення приходу',
        },

        validation: {
          titleMin: 'Назва повинна містити щонайменше 2 символи',
          titleMax: 'Назва повинна містити не більше 80 символів',
          descriptionMin:
            'Опис повинен містити щонайменше 2 символи',
          descriptionMax:
            'Опис повинен містити не більше 300 символів',
          dateRequired: 'Дата є обов’язковою',
        },
      },

      products: {
        title: 'Продукти',
        type: 'Тип',
        all: 'Усі',
        guarantee: 'Гарантія',
        price: 'Ціна',
        order: 'Приход',
        noProducts: 'Продуктів не знайдено.',
        unknownOrder: 'Невідомий приход',
      },

      common: {
        language: 'Мова',
      },
    },
  },
} as const;
