 
let placesGroup = [
    {
        category: 'Общепит',
        style: "islands#blueIcon",
        color: 'blue',
        places: [
            {coordinates: [56.478094, 84.950290], adress: 'Проспект Ленина, 85а', info:'Decs1', name: 'Make Love Pizza'},
            {coordinates: [56.483895, 84.982243], adress: 'Комсомольский проспект, 14а', info:'Decs1', name: 'Make Love Pizza'}
        ]
    },
    {
        category: 'Культурные места',
        style: "islands#redIcon",
        color: 'red',
        places: [
            {coordinates: [56.488875, 84.952742], adress: 'Улица Бакунина, 3', info:'Decs1', name: 'Музей истории города Томск'},
 		    {coordinates: [56.482662, 84.947406], adress: '​Переулок Нахановича, 3', info:'Decs1', name: 'Томский областной художественный музей'},
 
        ]
    },
    {
        category: 'Достопримечательности',
        style: "islands#greenIcon",
        color: 'green',
        places: [
            {coordinates: [56.462471, 84.942681], adress: 'Улица Аркадия Иванова, 18А', info:'Decs1', name: 'Аллея Пивоваров'},
            {coordinates: [56.493919, 84.954647], adress: 'Улица Октябрьский Взвоз, 10', info:'Decs1', name: 'Воскресенская церковь'}
        ]
    }

];
 
 ymaps.ready(init);
    function init(){

        var myMap = new ymaps.Map('map', {
            center: [56.474467, 84.950493],
            zoom: 5,
            controls: []
        }, { 
            //Границы карты
            restrictMapArea: [
                [56.578572, 84.807180],
                [56.396909, 85.165454]
            ]
        }),

        // Контейнер для меню.
        menu = $(`<ul class="places_tomsk"></ul>`);
        
    for (var i = 0, l = placesGroup.length; i < l; i++) {
        createMenuGroup(placesGroup[i]);
    }

    function createMenuGroup (placesGroup) {
        // Пункт меню.
        var menuItem = $('<li class="main_li"><a>' + placesGroup.category + '</a></li>'),
        // Коллекция для геообъектов группы.
            collection = new ymaps.GeoObjectCollection(null, { preset: placesGroup.style }),
        // Контейнер для подменю.
            submenu = $('<ul class="places_tomsk_sub"></ul>');

        // Добавляем коллекцию на карту.
        myMap.geoObjects.add(collection);
        // Добавляем подменю.
        menuItem
            .append(submenu)
            // Добавляем пункт в меню.
            .appendTo(menu)
            // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
            .find('a')
            .bind('click', function () {
                if (collection.getParent()) {
                    myMap.geoObjects.remove(collection);
                    submenu.hide();
                } else {
                    myMap.geoObjects.add(collection);
                    submenu.show();
                }
            });
        for (var j = 0, m = placesGroup.places.length; j < m; j++) {
            createSubMenu(placesGroup.places[j], collection, submenu);
        }
    }

    function createSubMenu (item, collection, submenu) {
        // Пункт подменю.
        var submenuItem = $('<li><a>' + item.name + '</a></li>'),
        // Создаем метку.
            placemark = new ymaps.Placemark(item.coordinates, 
                { 
                    balloonContentHeader: item.name,
                    balloonContentBody: item.info,
                    balloonContentFooter: item.adress,
                }
            );

        // Добавляем метку в коллекцию.
        collection.add(placemark);
        // Добавляем пункт в подменю.
        submenuItem
            .appendTo(submenu)
            // При клике по пункту подменю открываем/закрываем баллун у метки.
            .find('a')
            .bind('click', function () {
                myMap.setCenter(item.coordinates,15)
                if (!placemark.balloon.isOpen()) {
                    placemark.balloon.open();
                } else {
                    placemark.balloon.close();
                }
                return false;

            });
    }

    // Добавляем меню в тэг BODY.
    menu.appendTo($('.listGroup'));
    // Выставляем масштаб карты чтобы были видны все группы.
    myMap.setBounds(myMap.geoObjects.getBounds());
}


