import { Box, Button, Container, Stack, Typography } from "@mui/material"

import { ProtectedPage } from "../components/templates/page-template"
import { Link } from "../components/common/navigation"
import { useWindowState } from "../utils/effects"
import { useAppSelector } from "../data/hooks"
import { useAuthorized } from "../utils/requestor"

export default function Home() {
  const height = useWindowState()[1]

  const { authorized } = useAuthorized()
  const permissions = useAppSelector(state => state.moderator.permissions)

  // TODO scrollbar's showing up on vertical resize

  return <ProtectedPage code={authorized ? 200 : 0} shift={false} style={{ overflow: "hidden" }}>
    <Box sx={{ display: "flex", alignContent: "center", justifyContent: "center", height: height }}>
      <Stack sx={{ maxWidth: 900, width: "100%", m: "auto", textAlign: "center" }} direction="column">
        <Typography variant="h1">
          Welcome!
        </Typography>
        <Typography variant="h3">
          What&apos;s next?
        </Typography>
        {permissions === undefined || permissions?.length === 0
          ? <Typography variant="body1" sx={{ mt: 1 }}>
            This account doesn&apos;t have any permissions
          </Typography>
          : <Container sx={{ justifyContent: "space-between", mt: 1 }}>
            {permissions?.map((item, key) =>
              <Link href={`/categories/${item.name.replace(" ", "-")}`} key={key}>
                <Button variant="contained" sx={{ width: 170, mx: 2, my: 1 }}>
                  {item.name}
                </Button>
              </Link>)}
          </Container>
        }
      </Stack>
    </Box>
  </ProtectedPage>
}
