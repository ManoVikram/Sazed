from langchain_community.tools import DuckDuckGoSearchRun
from langchain.agents import create_agent

def run_research(query):
    """
    Uses web search tool to gather info.
    """
    search = DuckDuckGoSearchRun()

    research_agent = create_agent(
        model="gpt-4o-mini",
        tools=[search],
        system_prompt="You are a helpful research assistant. Use the web search tool to find relevant information for the user's query.",
    )

    messages = [
        {
            "role": "user",
            "content": f"Search the web and gather key information on: {query}"
        }
    ]

    result = research_agent.invoke({
        "messages": messages
    })

    return result