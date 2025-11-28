import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Calendar, CreditCard, TrendingUp } from "lucide-react"
import type { PaymentInfo } from "@/lib/types"

interface PaymentSectionProps {
  paymentInfo: PaymentInfo
}

const schemeLabels: Record<string, string> = {
  nomina: "Nómina",
  mixto: "Esquema Mixto",
  honorarios: "Honorarios",
  deel: "Deel",
  pb: "Payoneer / PB",
}

export function PaymentSection({ paymentInfo }: PaymentSectionProps) {
  const nextPaymentDate = new Date(paymentInfo.nextPaymentDate)
  const today = new Date()
  const daysUntilPayment = Math.ceil((nextPaymentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wallet className="h-5 w-5 text-primary" />
          Información de Pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Next Payment */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Próximo pago</p>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {daysUntilPayment > 0 ? `En ${daysUntilPayment} días` : "Hoy"}
            </Badge>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold">
                {paymentInfo.estimatedAmount?.toLocaleString("es-MX")} {paymentInfo.currency}
              </p>
              <p className="text-sm text-muted-foreground">
                {nextPaymentDate.toLocaleDateString("es-MX", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary/40" />
          </div>
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Esquema</p>
            </div>
            <p className="font-medium text-sm">{schemeLabels[paymentInfo.scheme]}</p>
          </div>
          <div className="p-3 rounded-lg border">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Canal</p>
            </div>
            <p className="font-medium text-sm">{paymentInfo.channel}</p>
          </div>
        </div>

        {/* Last Payment */}
        {paymentInfo.lastPaymentDate && (
          <div className="pt-3 border-t">
            <p className="text-xs text-muted-foreground">
              Último pago:{" "}
              {new Date(paymentInfo.lastPaymentDate).toLocaleDateString("es-MX", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
