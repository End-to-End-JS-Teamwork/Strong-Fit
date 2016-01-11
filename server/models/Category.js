var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {
        type: String,
        validate: function (input) {
            return (input.length > 5 && input.length <= 50)
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} name of the category should be between 5 and 30 symbols'
    },
    subcategories: [{type: String}]
});

var Category = mongoose.model('Category', categorySchema);

function categorySeed() {
    Category
        .find({})
        .exec(function (err, categories) {
            if (err) {
                console.log('Cannot find categories...');
                return;
            }

            if (categories.length === 0) {
                Category.create({
                    name: 'СтронгФит',
                    subcategories: [
                        'Полезни връзки във форума',
                        'Често задавани въпроси',
                        'Общи теми']
                });

                Category.create({
                    name: 'CrossFit',
                    subcategories: [
                        'Комплекси и методики',
                        'Групови тренировки',
                        'Общи теми за CrossFit']
                });

                Category.create({
                    name: 'Хранене',
                    subcategories: [
                        'Хранителни режими за покачване на тегло',
                        'Хранителни режими за отслабване',
                        'Храни и хранителни продукти',
                        'Рецепти',
                        'Общи теми за хранене']
                });

                Category.create({
                    name: 'Хранителни добавки',
                    subcategories: [
                        'Хранителни добавки за покачване на тегло',
                        'Хранителни добавки за изгаряне на мазнини',
                        'Хранителни добавки за сила и издръжливост',
                        'Продуктови ревюта',
                        'Общи теми за хранителни добавки']
                });

                Category.create({
                    name: 'Други дискусии',
                    subcategories: [
                        'Извън спортния център',
                        'Да си поговорим']
                });

                console.log('Categories added to database...');
            }
        });
}

module.exports.seedInitialCategories = function () {
    setTimeout(categorySeed, 1200);
};