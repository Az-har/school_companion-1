interface prismaDataArgs {
  many: boolean | false;
  args: Object;
  connect?: connectArgs[];
}

interface connectArgs {
  name: string;
  id: string;
}

const prismaDataValidator = (params: prismaDataArgs) => {
  const argsData: { [key: string]: string } = {};

  Object.entries(params.args).map((entry) => {
    const [key, value] = entry;
    if (value) argsData[key] = value;
  });

  const connectArgs: { [key: string]: any } = {};

  if (params.connect) {
    if (params.many) {
      params.connect.forEach((connect) => {
        connectArgs[connect.name + "Id"] = connect.id;
      });
    } else {
      params.connect.forEach((connect) => {
        connectArgs[connect.name] = { connect: { id: connect.id } };
      });
    }
  }

  let data: { [key: string]: any };

  if (params.many) {
    data = { ...argsData, ...connectArgs };
  } else {
    data = {
      data: { ...argsData, ...connectArgs },
    };
  }

  return data;
};

export default prismaDataValidator;
