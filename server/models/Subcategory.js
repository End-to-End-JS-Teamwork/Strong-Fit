var mongoose = require('mongoose');

var subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        validate: function (input) {
            return (input.length > 5 && input.length <= 50)
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} name of the subcategory should be between 5 and 30 symbols'
    },
    category: {type: String},
    topics: [String]
});

var Subcategory = mongoose.model('Subcategory', subcategorySchema);

function subcategorySeed() {
    Subcategory
        .find({})
        .exec(function (err, subcategories) {
            if (err) {
                console.log('Cannot find subcategories...');
                return;
            }

            if (subcategories.length === 0) {
                Subcategory.create({
                    name: 'Полезни връзки във форума',
                    category: 'СтронгФит',
                    topics: []
                });

                Subcategory.create({
                    name: 'Често задавани въпроси',
                    category: 'СтронгФит',
                    topics: []
                });

                Subcategory.create({
                    name: 'Общи теми',
                    category: 'СтронгФит',
                    topics: []
                });

                Subcategory.create({
                    name: 'Комплекси и методики',
                    category: 'CrossFit',
                    topics: []
                });

                Subcategory.create({
                    name: 'Групови тренировки',
                    category: 'CrossFit',
                    topics: [
                        'Групова тренировка в петък - 14.01.2016 - Южен Парк'
                    ]
                });

                Subcategory.create({
                    name: 'Общи теми за CrossFit',
                    category: 'CrossFit',
                    topics: []
                });

                Subcategory.create({
                    name: 'Хранителни режими за покачване на тегло',
                    category: 'Хранене',
                    topics: [
                        'Споделете как се хранете, когато качвате'
                    ]
                });

                Subcategory.create({
                    name: 'Хранителни режими за отслабване',
                    category: 'Хранене',
                    topics: []
                });

                Subcategory.create({
                    name: 'Храни и хранителни продукти',
                    category: 'Хранене',
                    topics: []
                });

                Subcategory.create({
                    name: 'Рецепти',
                    category: 'Хранене',
                    topics: [
                        'Добра рецепта за готвен заек',
                        'Споделете какви шейкове обичате',
                        'Протеинови сладки',
                        'Здравословен сандвич за победители'
                    ]
                });

                Subcategory.create({
                    name: 'Общи теми за хранене',
                    category: 'Хранене',
                    topics: []
                });

                Subcategory.create({
                    name: 'Хранителни добавки за покачване на тегло',
                    category: 'Хранителни добавки',
                    topics: []
                });

                Subcategory.create({
                    name: 'Хранителни добавки за изгаряне на мазнини',
                    category: 'Хранителни добавки',
                    topics: []
                });

                Subcategory.create({
                    name: 'Хранителни добавки за сила и издръжливост',
                    category: 'Хранителни добавки',
                    topics: []
                });

                Subcategory.create({
                    name: 'Продуктови ревюта',
                    category: 'Хранителни добавки',
                    topics: []
                });

                Subcategory.create({
                    name: 'Общи теми за хранителни добавки',
                    category: 'Хранителни добавки',
                    topics: []
                });

                Subcategory.create({
                    name: 'Извън спортния център',
                    category: 'Други дискусии',
                    topics: []
                });

                Subcategory.create({
                    name: 'Да си поговорим',
                    category: 'Други дискусии',
                    topics: []
                });

                console.log('Subcategories added to database...');
            }
        });
}

module.exports.seedInitialSubcategories = function () {
    setTimeout(subcategorySeed, 1300);
};
