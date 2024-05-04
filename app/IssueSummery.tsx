import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummery = ({ closed, inProgress, open }: Props) => {
  const containers = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <Flex gap="5" justify="center">
      {containers.map((container) => (
        <Link
          key={container.status}
          href={`/issues/list?statusFilter=${container.status}`}
        >
          <Card className="shadow-sm hover:shadow-md transition-all">
            <Flex gap="1" direction="column">
              <Text size="2">{container.label}</Text>
              <Text size="4" className="font-medium">
                {container.value}
              </Text>
            </Flex>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};

export default IssueSummery;
