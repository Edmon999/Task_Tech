export interface User {
    address: any;
    avatar: string;
    credit_card: { cc_number: string };
    date_of_birth: string;
    email: string;
    employment: { title: string; key_skill: string };
    first_name: string;
    gender: string;
    id: number;
    last_name: string;
    password: string;
    phone_number: string;
    social_insurance_number: string;
    subscription: {
      plan: string;
      status: string;
      payment_method: string;
      term: string;
    };
    uid: string;
    username: string;
  }