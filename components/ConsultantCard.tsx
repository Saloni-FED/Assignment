import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ConsultantCardProps {
  consultant: {
    id: string
    name: string
    avatar: string
    location: string
    yearsOfExperience: number
    expertise: string[]
    evaluation: {
      fitScore: number
      summary: string
      pros: string[]
      cons: string[]
      questions: string[]
    }
  }
}

export function ConsultantCard({ consultant }: ConsultantCardProps) {
  const { name, avatar, location, yearsOfExperience, expertise, evaluation } = consultant
  const { fitScore, summary, pros, cons, questions } = evaluation

  // Get initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="overflow-hidden py-0">
      <CardHeader className="bg-slate-50 py-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <h3 className="font-semibold text-lg truncate">{name}</h3>
              <div className="text-sm text-muted-foreground">
                {location} • {yearsOfExperience} years experience
              </div>
            </div>
          </div>
          <div className="sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
            <div className="text-sm text-muted-foreground sm:mb-1">Fit Score</div>
            <div className="flex items-center space-x-2">
              <Progress  value={fitScore} className="w-24 b" />
              <span className="font-medium">{fitScore}%</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-4">
          <div className="text-left">
            <div className="mb-2 font-medium">Expertise</div>
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-50">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-left">
            <div className="mb-2 font-medium">Evaluation Summary</div>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pros">
              <AccordionTrigger className="text-sm font-medium">Pros</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-left text-sm space-y-1">
                  {pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cons">
              <AccordionTrigger className="text-sm font-medium ">Cons</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-sm space-y-1 text-left">
                  {cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="questions">
              <AccordionTrigger className="text-sm font-medium">Suggested Questions</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 text-sm space-y-1 text-left">
                  {questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}
