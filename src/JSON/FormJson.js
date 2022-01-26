
export const FormFieldJson = {
    category: [
        {
          type: "text",
          title: "Name",
          name: "name",
          values: "",
          class: "col-span-3",
          require: true,
        },
        {
          type: "select",
          title: "Age",
          name: "age",
          values: "",
          class: "col-span-3",
          require: false,
          server: false,
          list: [
            {
              key: "a",
              value: "A",
            },
            {
              key: "b",
              value: "B",
            },
            {
              key: "c",
              value: "C",
            },
          ],
        },
        {
          type: "select",
          title: "Cars",
          name: "car",
          values: "",
          class: "col-span-3",
          require: true,
          server: true,
          list: '',
        },
      ],
  };