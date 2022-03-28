export const pets = ["cat", "dog", "bird", "rabbit", "guinea pig", "fish"];
export const fruits = ["appel", "orange", "banana", "strawberry"];

export type UserType = {
  id: number;
  pets: string;
  fruits: string;
};

const users: UserType[] = [];

for (let i = 0; i < 100; i++) {
  const user = {
    id: i,
    pets: pets[Math.floor(Math.random() * 6)],
    fruits: fruits[Math.floor(Math.random() * 4)]
  };
  users.push(user);
}

export default users;
