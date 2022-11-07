export type Trait = "attack" | "health" | "speed";

export interface NftAttirbute {
  trait_type: Trait;
  value: string;
}

export interface NftMeta {
  name: string;
  image: string;
  description: string;
  attributes: NftAttirbute[];
}
