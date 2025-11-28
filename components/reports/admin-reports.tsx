"use client"

import { useState } from "react"
import { TrendingDown, Globe, Briefcase, Download, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  mockHeadcountData,
  mockSkillDistribution,
  mockTurnoverData,
  mockCountryDistribution,
  mockSeniorityDistribution,
  mockEmployees,
} from "@/lib/mock-data"

const COLORS = ["#6366f1", "#8b5cf6", "#a855f7", "#ec4899", "#f43f5e"]

export function AdminReports() {
  const [period, setPeriod] = useState("6m")

  const currentHeadcount = mockHeadcountData[mockHeadcountData.length - 1]
  const previousHeadcount = mockHeadcountData[mockHeadcountData.length - 2]
  const headcountChange = currentHeadcount.total - previousHeadcount.total
  const headcountChangePercent = ((headcountChange / previousHeadcount.total) * 100).toFixed(1)

  const avgTurnover = (mockTurnoverData.reduce((acc, d) => acc + d.rate, 0) / mockTurnoverData.length).toFixed(1)
  const activeCount = mockEmployees.filter((e) => e.status === "active").length
  const onboardingCount = mockEmployees.filter((e) => e.status === "onboarding").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Reportes y Analíticas</h1>
          <p className="text-muted-foreground">Visualiza métricas clave del equipo</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Último mes</SelectItem>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="1y">Último año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Headcount Total</p>
                <p className="text-2xl font-semibold">{currentHeadcount.total}</p>
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${headcountChange >= 0 ? "text-success" : "text-destructive"}`}
              >
                {headcountChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                <span>
                  {headcountChange >= 0 ? "+" : ""}
                  {headcountChangePercent}%
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {activeCount} activos
              </Badge>
              <Badge variant="outline" className="text-xs">
                {onboardingCount} onboarding
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Rotación</p>
                <p className="text-2xl font-semibold">{avgTurnover}%</p>
              </div>
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingDown className="h-5 w-5 text-success" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Promedio últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Países</p>
                <p className="text-2xl font-semibold">{mockCountryDistribution.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Presencia regional</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Skills Únicos</p>
                <p className="text-2xl font-semibold">{mockSkillDistribution.length}</p>
              </div>
              <div className="p-2 rounded-lg bg-chart-2/10">
                <Briefcase className="h-5 w-5 text-chart-2" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">En el equipo</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs with Charts */}
      <Tabs defaultValue="headcount" className="space-y-4">
        <TabsList>
          <TabsTrigger value="headcount">Headcount</TabsTrigger>
          <TabsTrigger value="turnover">Rotación</TabsTrigger>
          <TabsTrigger value="demographics">Demografía</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="headcount" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evolución del Headcount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockHeadcountData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.2}
                      name="Total"
                    />
                    <Area
                      type="monotone"
                      dataKey="active"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.2}
                      name="Activos"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="turnover" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contrataciones vs Bajas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockTurnoverData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="hires" fill="#10b981" name="Contrataciones" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="departures" fill="#ef4444" name="Bajas" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tasa de Rotación Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTurnoverData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" unit="%" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value) => [`${value}%`, "Tasa"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ fill: "#6366f1", strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribución por País</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockCountryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="count"
                        nameKey="country"
                        label={({ country, percentage }) => `${country} (${percentage}%)`}
                        labelLine={false}
                      >
                        {mockCountryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Distribución por Seniority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSeniorityDistribution.map((item) => (
                    <div key={item.level} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.level}</span>
                        <span className="text-muted-foreground">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Skills en el Equipo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockSkillDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="skill" type="category" className="text-xs" width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value, name) => [`${value} personas`, "Cantidad"]}
                    />
                    <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
