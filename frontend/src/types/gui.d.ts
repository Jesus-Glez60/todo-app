// Status will define toast color and icon
export type TToastStatus = 'success' | 'warning' | 'error'

export type TIconName = 'toast-error' | 'toast-warning' | 'toast-success'

export type ToastPayload = { timeout?: number; text: string }

export interface IToast {
 // Text of toast
 text: string
 status: TToastStatus
 // Id to differentiate toasts
 id: number
}
