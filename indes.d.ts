type Primitive = string | number | boolean;

export function buildEnv(key: string, defaultValue?: Primitive): Primitive;
export function configEnv(key: string, defaultValue?: Primitive): Primitive;
