

export const options = () => {
    const optionsSex = [
        { text: 'Male', value: 'MALE' },
        { text: 'Female', value: 'FEMALE' }
    ]
    const optionsSize = [
        { text: 'Small', value: 'S' },
        { text: 'Medium', value: 'M' },
        { text: 'Large', value: 'L' },
        { text: 'Extra Large', value: 'XL' }
    ]
    const optionsAge = [
        { text: 'Baby', value: 'BABY' },
        { text: 'Young', value: 'YOUNG' },
        { text: 'Adult', value: 'ADULT' },
        { text: 'Senior', value: 'SENIOR' }
    ]
    return {
        optionsSex,
        optionsSize,
        optionsAge
    }
}

export const columnsTable = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '14%',
            sorter: true
        },
        {
            title: 'Specie Name',
            dataIndex: 'specie.name',
            width: '14%',
            sorter: true
        },
        {
            title: 'Breed Primary',
            dataIndex: 'breed_primary.name',
            width: '14%',
        },
        {
            title: 'Sex',
            dataIndex: 'sex_key',
            filters: options().optionsSex,
            width: '14%',
        },
        {
            title: 'Size',
            dataIndex: 'size_key',
            filters: options().optionsSize,
            width: '14%',
        },
        {
            title: 'Age',
            dataIndex: 'age_key',
            filters: options().optionsAge,
            width: '14%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '14%',
        },
    ];
    return {
        columns
    }
}

export const commonFields = {
    _fields: [
        "id",
        "uuid",
        "custom_code",
        "name",
        "specie_id",
        "breed_primary_id",
        "price",
        "created_date",
        "status_key",
        "branch_id",
        "payment_model_key",
        "sex_key",
        "size_key",
        "age_key"
    ],
    specie: {
        with: {
            _fields: [
                'id',
                'name'
            ]
        }
    },
    breed_primary: {
        with: {
            _fields: [
                'id',
                'name'
            ]
        }
    },
    branch: {
        with: {
            uuid: "ef71cadf-fa9b-4c8b-a1a8-0e31e784c3ff",
            _fields: [
                'id',
                'uuid'
            ]
        }
    }
}