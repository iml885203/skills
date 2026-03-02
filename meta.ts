export interface VendorSkillMeta {
  official?: boolean
  source: string
  skills: Record<string, string>
}

export const submodules = {}

export const vendors: Record<string, VendorSkillMeta> = {}
