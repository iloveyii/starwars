// Login
export type ConditionT = {
  where?: any;
};

export type UserT = {
  id?: string | number;
  email: string;
  password: string;
};

export type ResultT = {
  success: boolean;
  data: UserT;
};

export type ResponseT = {
  success: boolean;
  data: any[];
};

// Products types
export type AttributeT = {
  name: string;
  value: string;
};

export type ProductT = {
  id: string;
  name: string;
  attributes: AttributeT[];
};
